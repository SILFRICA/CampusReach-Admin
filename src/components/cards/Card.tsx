import React, { ReactElement } from "react";

interface CardProps {
  className: string;
  amount: number;
  title: string;
  icon?: ReactElement;
  iconParentClass?: string;
  children: ReactElement | null;
}

const Card: React.FC<CardProps> = ({
  className,
  amount,
  title,
  icon,
  iconParentClass,
  children,
}) => {
  return (
    <div className={`${className} rounded-[20px] p-6 shadow-md shadow-black/5`}>
      <div className="flex justify-between mb-6">
        <div>
          <div className="flex items-center mb-1 gap-2">
            <div className="text-3xl font-semibold text-black">{amount}</div>
            {icon && <div className={`p-1 ${iconParentClass}`}>{icon}</div>}
          </div>
          <div className="text-base font-medium text-black">{title}</div>
        </div>
      </div>

      <div className="w-[99px] h-[24px] flex">{children}</div>
    </div>
  );
};

export default Card;
