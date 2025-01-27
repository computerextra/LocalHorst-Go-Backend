import BackButton from "@/components/BackButton";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { deleteWiki, getWiki, updateWiki, UpdateWikiProps } from "@/db/Wiki";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import {
  BlockTypeSelect,
  BoldItalicUnderlineToggles,
  headingsPlugin,
  InsertTable,
  listsPlugin,
  ListsToggle,
  MDXEditor,
  quotePlugin,
  Separator,
  thematicBreakPlugin,
  toolbarPlugin,
  UndoRedo,
  linkPlugin,
  linkDialogPlugin,
  tablePlugin,
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { z } from "zod";

const formData = z.object({
  Name: z.string(),
  Inhalt: z.string(),
});

export default function EditWiki() {
  const { wid } = useParams();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["Wiki", wid],
    queryFn: () => getWiki({ id: wid ?? "" }),
  });

  const form = useForm<z.infer<typeof formData>>({
    resolver: zodResolver(formData),
    defaultValues: {
      Name: data?.Name ?? "",
      Inhalt: data?.Inhalt ?? "",
    },
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (data == null) return;

    form.reset({
      Inhalt: data.Inhalt,
      Name: data.Name,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const onSubmit = async (values: z.infer<typeof formData>) => {
    if (wid == null) return;
    const data: UpdateWikiProps = {
      ID: wid,
      CreatedAt: new Date().toString(),
      Inhalt: values.Inhalt,
      Name: values.Name,
    };

    const res = await updateWiki(data);
    if (res) navigate("/Wiki");
  };

  const handleDelete = async () => {
    if (wid == null) return;
    await deleteWiki({ id: wid });
    navigate("/Wiki");
  };

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <>Server Fehler</>;

  if (data)
    return (
      <>
        <BackButton href="/Wiki" />
        <h1 className="mb-4">{data.Name} bearbeiten</h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="Name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input required {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="Inhalt"
              render={({ field }) => (
                <>
                  <div className="sr-only">
                    <FormItem>
                      <FormLabel>Inhalt</FormLabel>
                      <FormControl>
                        <Textarea className="resize-y" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </div>
                  <MDXEditor
                    ref={field.ref}
                    markdown={field.value}
                    onChange={field.onChange}
                    plugins={[
                      headingsPlugin(),
                      listsPlugin(),
                      quotePlugin(),
                      linkPlugin(),
                      linkDialogPlugin(),
                      tablePlugin(),
                      thematicBreakPlugin(),
                      toolbarPlugin({
                        toolbarClassName: "flex row gap-4",
                        toolbarContents: () => (
                          <>
                            <UndoRedo />
                            <Separator />
                            <BoldItalicUnderlineToggles />
                            <Separator />
                            <BlockTypeSelect />
                            <Separator />
                            <InsertTable />
                            <ListsToggle />
                          </>
                        ),
                      }),
                    ]}
                  />
                </>
              )}
            />
            <div className="flex justify-between">
              <Button type="submit">Speichern</Button>
              <Button
                variant="secondary"
                onClick={(e) => {
                  e.preventDefault();
                  void handleDelete();
                }}
              >
                Löschen
              </Button>
            </div>
          </form>
        </Form>
      </>
    );
}
