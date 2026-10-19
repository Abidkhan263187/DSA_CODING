
export default function SheetSkeleton() {
    return (
      <>
        <section className="stats">
          {Array.from({ length: 4 }, (_, index) => (
            <div className="skel skel-card" key={index} />
          ))}
        </section>
  
        <div className="skel skel-block" />
        <div className="skel skel-block" />
      </>
    );
  }
  