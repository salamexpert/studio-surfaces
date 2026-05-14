type Props = {
  eyebrow: string;
  title: string;
  intro?: string;
  image?: string;
};

export function PageHero({ eyebrow, title, intro, image }: Props) {
  return (
    <section className="relative">
      {image && (
        <div className="absolute inset-0 -z-10">
          <img src={image} alt="" className="w-full h-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/85 to-background" />
        </div>
      )}
      <div className="container-editorial pt-20 pb-16 md:pt-32 md:pb-24">
        <p className="eyebrow fade-up">{eyebrow}</p>
        <h1 className="display text-5xl md:text-7xl lg:text-8xl mt-6 max-w-4xl fade-up">
          {title}
        </h1>
        {intro && (
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground fade-up">
            {intro}
          </p>
        )}
      </div>
    </section>
  );
}
