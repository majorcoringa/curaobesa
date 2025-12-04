"use client";

import { MessageSquare } from "lucide-react";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Input } from "./ui/input";

export default function ChatWidget() {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            size="icon"
            className="rounded-full w-14 h-14 shadow-lg"
            aria-label="Abrir chat de suporte"
          >
            <MessageSquare className="h-6 w-6" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 mr-4">
          <div className="grid gap-4">
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Chat de Suporte</h4>
              <p className="text-sm text-muted-foreground">
                Olá! Como podemos ajudar hoje?
              </p>
            </div>
            <div className="grid gap-2">
              <div className="flex flex-col gap-2">
                <div className="bg-muted p-3 rounded-lg text-sm self-start max-w-[80%]">
                  Digite sua pergunta abaixo.
                </div>
              </div>
              <Input id="chat-message" placeholder="Sua mensagem..." />
              <Button>Enviar</Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
