import ErrorState from "@/components/ErrorState";

export default function NotFound() {
  return (
    <ErrorState
      title="This page isn't on the sheet"
      message="The page you're looking for doesn't exist. Head back to AlgoTrack and continue from there."
      showHome
    />
  );
}
