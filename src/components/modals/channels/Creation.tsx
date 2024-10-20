import { useContext, useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import toast, {Toaster} from 'react-hot-toast'
import { AuthContext } from '@/context/AuthContext'
import apiUrl from '@/data/axios'
import axios from 'axios'
import { HomeDataResponse } from '@/components/pages/dashboard/home/response'

interface FormData {
  type: "Public" | "Private";
  name: string;
  description: string;
  category: string;
  targetAudience: string;
  subchannelWebsite: string;
  profileImage?: File;
  adminPermissions: {
    createPosts: boolean;
    receiveEmailEnquiries: boolean;
    receiveWhatsAppEnquiries: boolean;
    representChannel: boolean;
    seeAnalytics: boolean;
  };
  adminEmail: string;
  adminInstructions: string;
}

interface CreateChannelModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    data: HomeDataResponse | null;
}

interface ChannelCreatedResponse {
    id: number|string;
    channel_id: number|string;
    admin_id: number|string;
    name: string;
    type: string;
    description: string;
}

export default function CreateChannelModal({ open, onOpenChange, data }: CreateChannelModalProps) {
    const {userData} = useContext(AuthContext)
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    type: "Public",
    name: "",
    description: "",
    category: "",
    targetAudience: "",
    subchannelWebsite: "",
    profileImage: undefined,
    adminPermissions: {
      createPosts: true,
      receiveEmailEnquiries: true,
      receiveWhatsAppEnquiries: true,
      representChannel: true,
      seeAnalytics: true
    },
    adminEmail: "",
    adminInstructions: ""
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isSkipped, setIsSkipped] = useState(false)
  const [isResponse, setIsResponse] = useState<ChannelCreatedResponse>({
    id: "",
    channel_id: "",
    admin_id: userData && userData.user ? userData.user.id : "",
    name: "",
    type: "",
    description: ""
  })

  const typeDesc = ['Information from this channel would be accessible to all users on the platform. Suitable for communicating with the general campus community or specific subsets.', 'Information from this channel would be accessible to only users granted access on the platform. Suitable for communication between staffs, heads of department and selected individuals.'];

  useEffect(() => {
    if (!open) {
      setStep(1)
      setFormData({
        type: "Public",
        name: "",
        description: "",
        category: "",
        targetAudience: "",
        subchannelWebsite: "",
        profileImage: undefined,
        adminPermissions: {
          createPosts: true,
          receiveEmailEnquiries: true,
          receiveWhatsAppEnquiries: true,
          representChannel: true,
          seeAnalytics: true
        },
        adminEmail: "",
        adminInstructions: ""
      })
    }
  }, [open])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleNext = () => {
    if (step < 5) {
      setStep(step + 1)
    } else {
        onOpenChange(false)
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleSkip = () => {
    if (step === 4) {
      handleSubmit()
    }
  }

  const handleProceedWithAdmin = () => {
    if (step === 4) {
        handleSubmit()
        setIsLoading(false)
        setStep(step + 1)
    }
  }

  const handleSubmit = async () => {
    setIsLoading(true);
    let ch_id = '';
    if (data?.channels_managed !== null){
        data?.channels_managed.forEach((id, index) => {
            if (index === 0) {
                ch_id = id.toString()
            }
            return;
        });
    }

    // Prepare form data
    const form = new FormData();
    form.append('user_id', userData?.user?.id ?? '');  // Add user_id
    form.append('channel_id', ch_id);  // Add channel_id
    form.append('name', formData.name);
    form.append('description', formData.description);
    form.append('category', formData.category);
    form.append('targetAudience', formData.targetAudience);
    if (formData.subchannelWebsite) {
      form.append('subchannelWebsite', formData.subchannelWebsite);
    }
    if (formData.profileImage) {
      form.append('profileImage', formData.profileImage);
    }
    form.append('type', formData.type);

    try {
        const API_URL = apiUrl("production");
      const response = await axios.post(`${API_URL}/api/subchannel`, form, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${userData?.token}`
          // No need for 'Content-Type' here, fetch automatically sets it for FormData
        }});

      if (response.status !== 201) {
        toast.error('Failed')
        throw new Error('Failed to create channel');
      }

      const channel: ChannelCreatedResponse = await response.data.data;
      console.log(channel);
      setIsResponse(channel);
      toast.success('Channel created!')
      setIsSkipped(true)
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response) {
              // Server responded with a status other than 2xx
              toast.error('process failed')
              console.error("Process failed. Please try again.");
            } else if (error.request) {
              // No response was received from the server
              toast.error('network error')
              console.error(
                "Network error. Please check your connection and try again."
              );
            } else {
              // Something else happened while setting up the request
              toast.error('unexpected error')
              console.error("An unexpected error occurred. Please try again.");
            }
          } else {
            // Non-Axios error
            toast.error('something went wrong')
            console.error("An unexpected error occurred. Please try again.");
          }
          console.error("channel error:", error);
          setStep(3)
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddAdmin = async () => {
    setIsLoading(true);
    const adminInvite = {
        channel_id: isResponse.channel_id,
        sub_channel_id: isResponse.id,
        user_id: isResponse.admin_id,
        email_invited: formData.adminEmail,
        email_body: formData.adminInstructions
    }

    try {
        const API_URL = apiUrl("production");
      const response = await axios.post(`${API_URL}/api/email/invite/user`, adminInvite, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userData?.token}`
          // No need for 'Content-Type' here, fetch automatically sets it for FormData
        }});

      if (response.status !== 200) {
        toast.error('Failed to add')
        throw new Error('Failed to invite admin');
      }

      const channel = await response.data.data;
      console.log(channel);
      toast.success('Admin Invited!')
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response) {
              // Server responded with a status other than 2xx
              toast.error('process failed')
              console.error("Process failed. Please try again.");
            } else if (error.request) {
              // No response was received from the server
              toast.error('network error')
              console.error(
                "Network error. Please check your connection and try again."
              );
            } else {
              // Something else happened while setting up the request
              toast.error('unexpected error')
              console.error("An unexpected error occurred. Please try again.");
            }
          } else {
            // Non-Axios error
            toast.error('something went wrong')
            console.error("An unexpected error occurred. Please try again.");
          }
          console.error("admin add error:", error);
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        onOpenChange(false);
        window.location.reload();
      }, 1500);
    }
  };

  const renderStepContent = () => {
    switch(step) {
      case 1:
        return (
          <RadioGroup
            defaultValue={formData.type}
            onValueChange={(value: "Public" | "Private") => setFormData(prev => ({ ...prev, type: value }))}
            className="space-y-4"
          >
            {["Public", "Private"].map((type, index) => (
              <div
                key={type}
                className={cn(
                  "flex items-center justify-between rounded-lg border p-4",
                  formData.type === type
                    ? "border-[#03CF79] bg-[#DDF6EC]"
                    : "border-gray-200"
                )}
              >
                <div className="space-y-1">
                  <Label
                    htmlFor={type}
                    className="text-base font-semibold capitalize cursor-pointer"
                  >
                    {type}
                  <p className="text-xs sm:text-sm text-gray-500">
                    {typeDesc[index]}
                  </p>
                  </Label>
                </div>
                <RadioGroupItem
                  value={type}
                  id={type}
                  className='w-8 checked:bg-[#03CF79] checked:text-[#03CF79]'
                />
              </div>
            ))}
          </RadioGroup>
        )
      case 2:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" value={formData.name} onChange={handleInputChange} />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" name="description" value={formData.description} onChange={handleInputChange} />
            </div>
            <div>
              <Label>Profile Image</Label>
              <div className="bg-[#DDF6EC] text-xs sm:text-sm font-medium border border-[#03CF79] p-4 text-center rounded-md">
                <Label htmlFor='profileImage' className='w-full'>Tap to select 1280x1280 (recommended)</Label>
                <input type='file' name='profileImage' id='profileImage' className='sr-only'/>
              </div>
            </div>
            <div>
              <Label htmlFor="category">Category</Label>
              <Select name="category" onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Tap to select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Administration">Administration</SelectItem>
                  <SelectItem value="Faculty">Faculty</SelectItem>
                  <SelectItem value="Department">Department</SelectItem>
                  <SelectItem value="School Official">School Official</SelectItem>
                  <SelectItem value="Association">Association</SelectItem>
                  <SelectItem value="School Partner">School Partner</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )
      case 3:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="primaryAudience">Primary audience</Label>
              <Select name="targetAudience" onValueChange={(value) => setFormData(prev => ({ ...prev, targetAudience: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Tap to select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="staff">staff</SelectItem>
                  <SelectItem value="student">student</SelectItem>
                  <SelectItem value="host-community">host-community</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="website">Website</Label>
              <Input id="website" name="subchannelWebsite" value={formData.subchannelWebsite} onChange={handleInputChange} placeholder="https://" />
            </div>
            {/* <div>
              <Label htmlFor="primaryCampus">Primary campus</Label>
              <Select name="primaryCampus" onValueChange={(value) => setFormData(prev => ({ ...prev, primaryCampus: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Tap to select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="campus1">Campus 1</SelectItem>
                  <SelectItem value="campus2">Campus 2</SelectItem>
                </SelectContent>
              </Select>
            </div> */}
          </div>
        )
      case 4:
        return (
          <div className="space-y-4">
            <h3 className="font-semibold">Assign administrator</h3>
            <p className="text-sm text-muted-foreground">Adding an administrator to this channel would give such user the ability to:</p>
            <div className="space-y-2">
              {Object.entries(formData.adminPermissions).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between space-x-2 space-y-2 border-b">
                  <Label className='text-base font-normal' htmlFor={key}>{key.split(/(?=[A-Z])/).join(" ")}</Label>
                  <Checkbox
                    id={key}
                    checked={value}
                    style={{ "backgroundColor": "#03CF79", "border": "none", "marginBottom": "10px", "cursor": "not-allowed" }}
                  />
                </div>
              ))}
            </div>
            <p className='text-xs text-muted-foreground'>By clicking on “Skip” you are added as the manager of this channel. You can reassign access later</p>
          </div>
        )
      case 5:
        return (
          <div className="space-y-4">
            <h3 className="font-semibold">Assign administrator</h3>
            <div>
              <Label htmlFor="adminEmail">Email address</Label>
              <Input id="adminEmail" name="adminEmail" type='email' value={formData.adminEmail} onChange={handleInputChange} />
            </div>
            <div>
              <Label htmlFor="adminInstructions">Add instructions</Label>
              <Textarea id="adminInstructions" name="adminInstructions" value={formData.adminInstructions} onChange={handleInputChange} />
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[638px] max-sm:w-[300px]">
        <DialogHeader>
          <DialogTitle className="text-center">
            <span>New channel</span>
          </DialogTitle>
            <span className="text-sm text-muted-foreground text-right">{step}/5</span>
        </DialogHeader>
        <div className="pb-4">
          {renderStepContent()}
        </div>
        <DialogFooter>
          {step > 3 && step !== 5 ? <Button variant="outline" disabled={isSkipped} onClick={handleSkip}>Skip</Button> : step > 1 && step < 6 && <Button variant="outline" disabled={isSkipped} onClick={handleBack}>Back</Button>}
          <Button onClick={() => {
            step > 4 ? handleAddAdmin() : step > 1 && step === 4 ? handleProceedWithAdmin() : handleNext()
          }} disabled={isLoading} className='bg-[#03CF79]'>
            {isLoading ? "Loading..." : step < 4 ? "Next" : step === 4 ? "Proceed" : "Add admin"}
          </Button>
        </DialogFooter>
      </DialogContent>
      <Toaster />
    </Dialog>
  )
}
