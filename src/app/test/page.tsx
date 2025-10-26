import Mdx from './science.mdx';
 
const Page = () => {
  return (
    <div className='page-center' style={{ justifySelf: "right" }}>
      <div style={{ height: "80%", overflowY: "auto" }}>
        <Mdx />
      </div>
    </div>
  )
}

export default Page;
