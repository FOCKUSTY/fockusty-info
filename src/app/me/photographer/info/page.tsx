import { Link } from "@/components/link";
import PageCenter from "@/components/layout/PageCenter";

const Page = () => {
  return (
    <PageCenter>
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",

          minWidth: "300px",
          maxWidth: "900px",
          width: "100%",
          height: "fit-content",
          overflowY: "auto",
        }}
      >
        <p>
          Меня зовут Айдар, я фотограф-любитель, занимаюсь этими делом не так
          часто и только для своих друзей или знакомых Моя фотоаппарат:{" "}
          <Link href="https://ru.wikipedia.org/wiki/Nikon_D3500" name="Nikon D3500" />
          , который покупали для личных семейных фотографий, но однако им не
          пользовались, и в итоге я решил начать фотографировать своих
          одноклассников и заодно учиться
        </p>
      </div>
    </PageCenter>
  );
};

export default Page;
