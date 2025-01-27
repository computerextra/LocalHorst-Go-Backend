import BackButton from "@/components/BackButton";
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
import { createWiki, CreateWikiProps } from "@/db/Wiki";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  BlockTypeSelect,
  BoldItalicUnderlineToggles,
  headingsPlugin,
  InsertTable,
  linkDialogPlugin,
  linkPlugin,
  listsPlugin,
  ListsToggle,
  MDXEditor,
  quotePlugin,
  tablePlugin,
  thematicBreakPlugin,
  toolbarPlugin,
  UndoRedo,
  Separator,
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { z } from "zod";

const formData = z.object({
  Name: z.string(),
  Inhalt: z.string(),
});

export default function NewWiki() {
  const form = useForm<z.infer<typeof formData>>({
    resolver: zodResolver(formData),
    defaultValues: {
      Inhalt: "",
    },
  });
  const navigate = useNavigate();

  const onSubmit = async (values: z.infer<typeof formData>) => {
    const data: CreateWikiProps = {
      ID: "",
      CreatedAt: "",
      Inhalt: values.Inhalt,
      Name: values.Name,
    };

    const res = await createWiki(data);
    if (res) navigate("/Wiki");
  };

  return (
    <>
      <BackButton href="/Wiki" />
      <h1 className="mb-4">Neuen Wiki Eintrag anlegen</h1>

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
          <Button type="submit">Speichern</Button>
        </form>
      </Form>
    </>
  );
}
