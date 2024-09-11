import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import React, {useState} from 'react'
import { CalendarIcon } from "lucide-react"
import { TimePicker12Demo } from "@/components/ui/time-picker-12h-demo"

const AlertsPage: React.FC = () => {
    const [alertType, setAlertType] = useState('General Announcement')
    const types = ['Urgent Alert', 'General Announcement', 'Security Warning'];
    const [date, setDate] = useState<Date | undefined>(new Date())
    const [audience, setAudience] = useState('students')
    const handleAlertType = (type: string) => {
        setAlertType(type);
    }
    const handleAlertAudience = (value: string) => {
        setAudience(value)
    }
  return (
    <section className='p-6'>
        <header>
            <h4 className="font-semibold text-xl text-black">
                Alerts
            </h4>
        </header>
        <br />
        <div className="flex justify-between">
            <div className='inline-block'>Alert type:
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="outline">{alertType}</Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-fit">
                    {types.map(type => (
                        <p
                        onClick={() => handleAlertType(type)}
                        key={type}
                        className={`${type === alertType
                            ? 'bg-[#FFB13C]'
                            : ''} text-xs p-3 font-light rounded cursor-pointer`}
                        >
                            {type}
                        </p>
                    ))}
                    </PopoverContent>
                </Popover>
            </div>
            <div className="min-w-[299px] flex gap-4">
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "min-w-[121px] bg-[#DFF9EE] text-[#03CF79] pl-3 text-left font-normal",
                        !{date} && "text-muted-foreground"
                      )}
                    >
                      {date ? (
                        format(date, "PPP HH:mm")
                      ) : (
                        <span>Schedule</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border"
                    initialFocus
                  />
                  <div className="p-3 border-t border-border">
                    <TimePicker12Demo setDate={setDate} date={date} />
                  </div>
                </PopoverContent>
              </Popover>
            <Button asChild>
            <a href="mailto:support@silfrica.com" className='w-[165px] bg-[#FFB13C] text-white flex justify-center items-center'>Send now</a>
            </Button>
            </div>
        </div>
        <br />
        <div className="w-full md:h-[438px]">
            <div className="h-[119px] flex flex-col gap-6">
                <Label htmlFor="title">Alert title</Label>
                <p>
                    <input className="w-full h-[54px] border rounded" name="title" id="title"/>
                    <p className="mt-1 text-sm font-light text-right">0/60</p>
                </p>
            </div>
            <div className="h-[193px] flex flex-col gap-6">
                <Label htmlFor="message">Message body</Label>
                <p>
                    <textarea className="w-full h-[128px] border rounded" name="message" id="message"></textarea>
                    <p className="mt-1 text-sm font-light text-right">0/250</p>
                </p>
            </div>
            <div className="h-[94px] flex flex-col gap-6">
                <Label htmlFor="audience">Audience</Label>
                <Select onValueChange={(e) => handleAlertAudience(e)} defaultValue={audience}>
                  <SelectTrigger className="focus:ring-offset-0 focus:border-none focus-within:border-none focus-visible:none">
                    <SelectValue placeholder="Tap to select recipients" />
                  </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="students">Students</SelectItem>
                  <SelectItem value="non-students">Non Students</SelectItem>
                </SelectContent>
              </Select>
            </div>
        </div>
    </section>
  )
}

export default AlertsPage
