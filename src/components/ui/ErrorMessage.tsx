interface ErrorMessageProps {
  errorTitle: string | undefined;
  errorDesc: string[] | undefined;
}

export default function ErrorMessage({
  errorDesc,
  errorTitle,
}: ErrorMessageProps) {
  return (
    <>
      {errorTitle && errorDesc && errorDesc?.length > 0 && (
        <div className="bg-red-700 rounded mt-2 p-2 text-white">
          <p className="font-semibold">{errorTitle}</p>
          <ol className="list-disc text-md ml-4">
            {errorDesc.map((desc, index) => (
              <li key={index}>{desc}</li>
            ))}
          </ol>
        </div>
      )}
    </>
  );
}
