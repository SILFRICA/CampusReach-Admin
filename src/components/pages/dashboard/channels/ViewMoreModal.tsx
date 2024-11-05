import React, { useEffect, useRef } from 'react';

interface ActivityItem {
  channelName: string;
  reach: number;
  timestamp: string;
}

interface PendingChannelItem {
  email: string;
  channelName: string;
  category: string;
}

interface ViewMoreModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: ActivityItem[] | PendingChannelItem[];
  type: 'activity' | 'pending';
  onDelete?: (channelName: string) => void;
  onResend?: (email: string) => void;
  onScroll?: (e: React.UIEvent<HTMLDivElement>) => void;
  hasMore?: boolean; // Add this to indicate if there's more data to load
  isLoading?: boolean; // Add this to show loading state
}

const ViewMoreModal: React.FC<ViewMoreModalProps> = ({
  isOpen,
  onClose,
  data,
  type,
  onDelete,
  onResend,
  onScroll,
  hasMore = false,
  isLoading = false
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    console.log('Scroll event triggered');
    if (!onScroll || !hasMore || isLoading) return;
    
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    // Trigger when user has scrolled within 100px of the bottom
    if (scrollHeight - scrollTop <= clientHeight + 100) {
      onScroll(e);
    }
  };

  const isActivityItem = (item: ActivityItem | PendingChannelItem): item is ActivityItem => {
    return 'reach' in item && 'timestamp' in item;
  };

  // Reset scroll position when modal opens
  useEffect(() => {
    if (isOpen && scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Modal header */}
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            {type === 'activity' ? 'Activity Log' : 'Pending Channels'}
          </h3>
        </div>

        {/* Scrollable content area */}
        <div 
          ref={scrollRef}
          className="max-h-[60vh] overflow-y-scroll scroll-smooth"
          onScroll={handleScroll}
        >
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 sticky top-0 z-10">
              <tr>
                {type === 'activity' ? (
                  <>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Channel Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Reach
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Timestamp
                    </th>
                  </>
                ) : (
                  <>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email Address
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Channel Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </>
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  {isActivityItem(item) ? (
                    <>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.channelName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.reach}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.timestamp}
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.channelName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.category}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm space-x-4">
                        {onResend && (
                          <button
                            onClick={() => onResend(item.email)}
                            className="text-blue-500 hover:text-blue-700 font-medium"
                          >
                            Resend
                          </button>
                        )}
                        {onDelete && (
                          <button
                            onClick={() => onDelete(item.channelName)}
                            className="text-red-500 hover:text-red-700 font-medium"
                          >
                            Delete
                          </button>
                        )}
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
          
          {/* Loading indicator */}
          {isLoading && (
            <div className="py-4 text-center text-gray-500">
              Loading more items...
            </div>
          )}
          
          {/* End of list indicator */}
          {!hasMore && data.length > 0 && (
            <div className="py-4 text-center text-gray-500">
              No more items to load
            </div>
          )}
        </div>

        {/* Modal footer */}
        <div className="p-6 border-t border-gray-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewMoreModal;