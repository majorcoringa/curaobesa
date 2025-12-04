"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useFormState } from "react-dom";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { getPersonalizedStories } from "@/app/actions";
import { type PersonalizedStoriesState } from "@/lib/definitions";
import { Quote, Loader2 } from "lucide-react";
import { useEffect, useRef, useState, useTransition } from "react";

const interestsList = [
  { id: "perda de peso", label: "Perda de peso" },
  { id: "saúde", label: "Melhorar a saúde" },
  { id: "bem-estar", label: "Bem-estar geral" },
  { id: "energia", label: "Aumentar energia" },
] as const;

const formSchema = z.object({
  age: z.string().min(1, { message: "Por favor, selecione uma faixa etária." }),
  interests: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "Você precisa selecionar pelo menos um interesse.",
  }),
});

export default function Testimonials() {
  const [isPending, startTransition] = useTransition();
  const [showResults, setShowResults] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  const initialState: PersonalizedStoriesState = {
    stories: [],
    message: "",
    fallbackStories: [],
  };

  const [state, formAction] = useFormState(getPersonalizedStories, initialState);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      age: "",
      interests: [],
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData();
    formData.append("demographics", `Faixa etária: ${values.age}`);
    formData.append("interests", values.interests.join(", "));

    startTransition(() => {
      formAction(formData);
      setShowResults(true);
    });
  }
  
  useEffect(() => {
    if (showResults && (state.stories.length > 0 || (state.fallbackStories && state.fallbackStories.length > 0)) && resultsRef.current) {
        resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [state.stories, state.fallbackStories, showResults]);

  const storiesToShow = state.stories && state.stories.length > 0 ? state.stories : state.fallbackStories;


  return (
    <section id="testimonials" className="py-16 md:py-24 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-headline font-bold mb-4">
            Histórias de Sucesso Reais
          </h2>
          <p className="text-lg text-muted-foreground">
            Filtre os depoimentos e veja histórias de pessoas como você, que
            transformaram suas vidas.
          </p>
        </div>

        <Card className="max-w-2xl mx-auto shadow-lg">
          <CardContent className="p-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="age"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sua faixa etária</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione sua idade" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="18-25">18-25 anos</SelectItem>
                          <SelectItem value="26-35">26-35 anos</SelectItem>
                          <SelectItem value="36-45">36-45 anos</SelectItem>
                          <SelectItem value="46-55">46-55 anos</SelectItem>
                          <SelectItem value="55+">Mais de 55 anos</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="interests"
                  render={() => (
                    <FormItem>
                      <div className="mb-4">
                        <FormLabel>Quais seus principais interesses?</FormLabel>
                        <FormDescription>
                          Selecione um ou mais.
                        </FormDescription>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                      {interestsList.map((item) => (
                        <FormField
                          key={item.id}
                          control={form.control}
                          name="interests"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={item.id}
                                className="flex flex-row items-start space-x-3 space-y-0"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(item.id)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([
                                            ...field.value,
                                            item.id,
                                          ])
                                        : field.onChange(
                                            field.value?.filter(
                                              (value) => value !== item.id
                                            )
                                          );
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  {item.label}
                                </FormLabel>
                              </FormItem>
                            );
                          }}
                        />
                      ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={isPending}>
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Buscando...
                    </>
                  ) : (
                    "Ver Depoimentos Personalizados"
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {showResults && (
          <div ref={resultsRef} className="mt-12 max-w-3xl mx-auto">
            {isPending ? (
              <div className="flex justify-center items-center p-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : storiesToShow && storiesToShow.length > 0 ? (
              <div className="space-y-6">
                 <h3 className="text-center text-2xl font-bold font-headline">
                    {state.stories.length > 0 ? "Depoimentos para você:" : "Nossas melhores histórias:"}
                 </h3>
                {storiesToShow.map((story, index) => (
                  <Card key={index} className="overflow-hidden shadow-md">
                    <CardContent className="p-6 flex gap-4 items-start">
                      <Quote className="w-8 h-8 text-primary/50 shrink-0" />
                      <blockquote className="italic text-foreground/80">
                        {story}
                      </blockquote>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground">
                {state.message || "Nenhum depoimento encontrado. Tente outros filtros."}
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
