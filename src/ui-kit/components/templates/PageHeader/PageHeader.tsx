import "./PageHeader.css";

interface PageHeaderProps {
  title: string;
}

export const PageHeader = ({ title }: PageHeaderProps) => {
  return (
    <div className="page-header textured-background">
      <div className="page-header__container">
        <h1 className="page-header__title">{title}</h1>
      </div>
    </div>
  );
};
