import Image from "next/image";

interface EmptyPros {
  label: string;
}
export const Empty = ({ label }: EmptyPros) => {
  return (
    <div className="h-full p-20 flex flex-col items-center justify center">
      <div className="relative h-72 w-72">
        <Image alt="Empty" fill src="/empty.png" />
      </div>
      <p className="tect-muted-foreground text-sm text-center">{label}</p>
    </div>
  );
};
