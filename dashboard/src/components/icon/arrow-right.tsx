import Icon, {
  IconComponentProps,
} from "@ant-design/icons/lib/components/Icon";
import React from "react";

const SVG = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.9175 5.81503L4.6025 2.60003C4.395 2.39953 4 2.52103 4 2.78503V9.21503C4 9.47903 4.395 9.60053 4.6025 9.40003L7.9175 6.18503C7.94328 6.1616 7.96388 6.13304 7.97797 6.10118C7.99207 6.06932 7.99935 6.03487 7.99935 6.00003C7.99935 5.9652 7.99207 5.93074 7.97797 5.89888C7.96388 5.86703 7.94328 5.83846 7.9175 5.81503Z"
      fill="currentColor"
    />
  </svg>
);

const ArrowRightIcon: React.FC<Partial<IconComponentProps>> = (props) => {
  return <Icon component={SVG} {...props} />;
};

export default ArrowRightIcon;
