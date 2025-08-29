import { Link } from "@/components/link";

import { GROUPS, Russian } from "@/api/paths";
import { Group } from "@/components/paths";

const Page = () => {
  return (
    <div className="page-center" style={{justifySelf: "center"}}>
      Привет! На этой странице я расскажу о том, что имеется на данном сайте!
      <div
        style={{
          display: "flex",
          flexDirection: "column"
        }}
      >
        <Link href="/me/info" name="Информация обо мне" />
        <Link href="/me/socials" name="Мои социальные сети" />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px"
          }}
        >
          {
            GROUPS.map(group => (
              <div
                key={group}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span>Я, как {Russian[group].toLowerCase()}:</span>
                <Group group={group} />
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
};

export default Page;
