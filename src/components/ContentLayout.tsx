import IdiomCard, { IdiomCardProps } from "./IdiomCard";
import UpdatingNotice from "./UpdatingNotice";

export interface ContentLayoutProps {
  description: React.ReactNode;
  idiomCardProps: IdiomCardProps;
  noticeBtnText: string;
}

function ContentLayout({
  description,
  idiomCardProps,
  noticeBtnText,
}: ContentLayoutProps) {
  return (
    <main className="container mx-auto px-4 pt-6 pb-12">
      {/* Intro Section */}
      <div className="mb-6 text-center max-w-3xl mx-auto">
        <div className="text-base md:text-lg text-muted-foreground leading-relaxed">
          {description}
        </div>
      </div>

      {/* Single Card Layout */}
      <IdiomCard {...idiomCardProps} />

      {/* Updating Notice */}
      <UpdatingNotice btnText={noticeBtnText} />
    </main>
  );
}

export default ContentLayout;
