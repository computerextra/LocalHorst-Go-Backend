import BackButton from "@/components/BackButton";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  headingsPlugin,
  linkDialogPlugin,
  linkPlugin,
  listsPlugin,
  MDXEditor,
  quotePlugin,
  tablePlugin,
  thematicBreakPlugin,
  MDXEditorMethods,
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";
import { getWiki } from "@/db/Wiki";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router";
import { useEffect, useRef } from "react";

export default function WikiDetails() {
  const { wid } = useParams();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["Wiki", wid],
    queryFn: () => getWiki({ id: wid ?? "" }),
  });
  const ref = useRef<MDXEditorMethods>(null);

  useEffect(() => {
    if (data == null) return;
    ref.current?.setMarkdown(data.Inhalt);
  }, [data]);

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <>Wiki Eintrag nicht gefunden</>;

  if (data)
    return (
      <>
        <BackButton href="/Wiki" />
        <Card key={data.ID}>
          <CardHeader>
            <CardTitle>{data.Name}</CardTitle>
            <CardDescription>
              Erstellt am: {new Date(data.CreatedAt).toLocaleDateString()}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <MDXEditor
              plugins={[
                headingsPlugin(),
                listsPlugin(),
                quotePlugin(),
                linkPlugin(),
                linkDialogPlugin(),
                tablePlugin(),
                thematicBreakPlugin(),
              ]}
              readOnly
              spellCheck={false}
              markdown={data.Inhalt}
              ref={ref}
            />
          </CardContent>
          <CardFooter>
            <div className="flex justify-between">
              <Button asChild>
                <Link to={`/Wiki/${data.ID}/Bearbeiten`}>Bearbeiten</Link>
              </Button>
            </div>
          </CardFooter>
        </Card>
      </>
    );
}
