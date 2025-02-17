import {FC} from "react";

type Props = {
  title: string,
  content: string
}

export const ArticleCard: FC<Props> = ({title, content}) => {
  return (
    <div>
      <h2>{title}</h2>
      <p>{content}</p>
    </div>
  );
}