import React, { ReactElement } from "react";

interface CardProps {
  className: string;
  amount: number;
  title: string;
  icon: ReactElement | null;
  iconParentClass: string;
  url: string;
  urlTitle: string;
}

const Card: React.FC<CardProps> = ({
  className,
  amount,
  title,
  icon,
  url,
  iconParentClass,
  urlTitle,
}) => {
  return (
    <div className={`${className} rounded-md p-6 shadow-md shadow-black/5`}>
      <div className="flex justify-between mb-6">
        <div>
          <div className="flex items-center mb-1 gap-2">
            <div className="text-2xl font-semibold">{amount}</div>
            {icon && <div className={`p-1 ${iconParentClass}`}>{icon}</div>}
          </div>
          <div className="text-sm font-medium">{title}</div>
        </div>
      </div>

      {urlTitle && (
        <a
          href={url}
          className="text-[#028374] font-medium text-sm hover:text-[#0c554d]"
        >
          {urlTitle}
        </a>
      )}
    </div>
  );
};

export default Card;
