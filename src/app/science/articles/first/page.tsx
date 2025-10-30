import Mdx from "./index.mdx";

const Page = () => {
  return (
    <div className="page-center" style={{ alignItems: "flex-end" }}>
      <div style={{ height: "80%", overflowY: "auto", width: "80%" }}>
        <Mdx />
      </div>
    </div>
  );
};

export default Page;
