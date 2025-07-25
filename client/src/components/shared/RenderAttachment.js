import { FileOpen } from "@mui/icons-material";
import { transformImage } from "../../lib/features";

const RenderAttachment = ({ file, url }) => {
  //console.log(file, url);

  switch (file) {
    case "image":
      return (
        <img
          src={transformImage(url, 200)}
          alt="attachment"
          width={"200px"}
          height={"150px"}
          style={{ objectFit: "contain" }}
        />
      );
    case "video":
      return (
        <video
          src={url}
          controls
          preload="none"
          style={{ maxWidth: "100%", maxHeight: "100%" }}
        />
      );
    case "audio":
      return <audio src={url} controls preload="none" />;
    default:
      return <FileOpen />;
  }
};
export default RenderAttachment;