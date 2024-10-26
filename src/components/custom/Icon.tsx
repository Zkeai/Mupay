import React, { SVGProps, useEffect } from "react";

interface IconProps extends SVGProps<SVGSVGElement> {
  type: string;
  size: number;
  className?: string;
  color?: string;
}

const Icon: React.FC<IconProps> = ({
  className,
  type,
  size = 24,
  color = "black",
  ...props
}) => {
  return (
    <svg
      className={`${className} iconfont ${type}`}
      aria-hidden="true"
      width={size}
      height={size}
      fill={color}
      {...props}
    >
      <use xlinkHref={`#${type}`} />
    </svg>
  );
};

export default Icon;
