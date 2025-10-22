import { Link } from "@/components/link";

import { GROUPS } from "@/api/paths";
import { GroupComponent } from "@/components/intro/group.component";

const Page = () => {
  return (
    <div className="page-center" style={{ justifySelf: "center" }}>
      Привет! На этой странице я расскажу о том, что имеется на данном сайте!
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Link href="/me/info" name="Информация обо мне" />
        <Link href="/me/socials" name="Мои социальные сети" />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          {GROUPS.map((group) => (
            <GroupComponent group={group} key={group} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
