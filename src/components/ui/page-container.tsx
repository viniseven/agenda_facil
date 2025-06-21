export const PageContainer = ({ children }: { children: React.ReactNode }) => {
  return <div className="space-y-6 p-6">{children}</div>;
};

export const PageHeaderContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="flex w-full items-center justify-between">{children}</div>
  );
};

export const PageHeaderContent = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <div>{children}</div>;
};

export const PageHeaderTitle = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <div className="text-2xl font-bold">{children}</div>;
};

export const PageHeaderDescription = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <div className="text-muted-foreground text-sm">{children}</div>;
};

export const PageHeaderButtonActions = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <div>{children}</div>;
};

export const PageContent = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>;
};
