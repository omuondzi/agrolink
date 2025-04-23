import clsx from "clsx";
import { Link } from "react-router-dom";

interface AmacoLogoProps {
  classname?: string;
}
const AgrolinkLogo = ({ classname }: AmacoLogoProps) => {
  return (
    <Link to="/">
      <img
        src="/images/logo.jpg"
        className={clsx("w-[130px] md:w-[150px]", classname)}
      ></img>
    </Link>
  );
};

export default AgrolinkLogo;
