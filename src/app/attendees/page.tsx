type PageProps = {
  children: React.ReactNode;
};

export default async function Page(props: PageProps) {
  return (
    <div>
      <h2>Attending Graduates</h2>
      <p>All graduates who are attending graduation</p>
    </div>
  );
}
