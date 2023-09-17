import { LeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import useScrollOpacity from "../hooks/useScrollOpacity";

type Props = {
  title: string | undefined;
};

function Header({ title }: Props) {
  const navigate = useNavigate();
  const opacity = useScrollOpacity();

  return (
    <section
      className={`flex z-20 items-center justify-between px-6 py-2 fixed top-0 w-full transition-all duration-300`}
      style={{ backgroundColor: `rgba(255, 255, 255, ${opacity})` }}
    >
      <LeftOutlined
        className={`w-1/4 text-start text-2xl ${
          opacity > 0.5 ? "text-black" : "text-white"
        }`}
        onClick={() => navigate(-1)}
      />
      <h1 className="w-2/4 text-center text-lg" style={{ opacity: opacity }}>
        {title}
      </h1>
      <div className="w-1/4"></div>
    </section>
  );
}

export default Header;
