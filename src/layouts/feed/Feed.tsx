type Props = any;

export function FeedLayout(props: Props) {
  console.log("FeedLayout", props);
  return (
    <div>
      <p>{JSON.stringify(props)}</p>
    </div>
  );
}
