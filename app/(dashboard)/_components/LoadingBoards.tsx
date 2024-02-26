import { ColorRing } from "react-loader-spinner";
const LoadingBoards = () => {
  return (
    <div className="grid place-items-center col-span-full min-h-[90vh]">
      <ColorRing
        visible={true}
        height="80"
        width="80"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        colors={["#fff6e0", "#64ccc5", "#F8BDEB", "#868e96", "#495057"]}
      />
    </div>
  );
};

export default LoadingBoards;
