import { useForm } from "react-hook-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card";
import { z } from "zod/v4";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./form";
import { Input } from "./input";
import { Textarea } from "./textarea";
import { Button } from "./button";
import { useCreateRoom } from "@/http/use-create-room";

const createRoomSchema = z.object({
    name: z.string().min(3, { message: 'Inclua no mínimo 3 caracteres' }),
    description: z.string(),
});

type CreateRoomFormData = z.infer<typeof createRoomSchema>;

export function CreateRoomForm() {
    const { mutateAsync: createRoom } = useCreateRoom();

    const createRoomForm = useForm<CreateRoomFormData>({
        resolver: zodResolver(createRoomSchema),
        defaultValues: {
            name: '',
            description: '',
        }
    });

    async function handleCreateRoom({ name, description } : CreateRoomFormData) {
        await createRoom({ name, description });
        
        createRoomForm.reset();
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Criar sala</CardTitle>
                <CardDescription>
                    Crie uma sala para começar a fazer perguntas e receber respostas
                    da I.A.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...createRoomForm}>
                    <form onSubmit={createRoomForm.handleSubmit(handleCreateRoom)} className="flex flex-col gap-4">
                        <FormField 
                            control={createRoomForm.control}
                            name="name"
                            render={({ field }) => {
                                return (
                                    <FormItem>
                                        <FormLabel>Nome da Sala</FormLabel>
                                        <FormControl>
                                            <Input 
                                                {...field}
                                                placeholder="Digite o nome da sala..." 
                                            />

                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )
                            }}
                        />
                        <FormField 
                            control={createRoomForm.control}
                            name="description"
                            render={({ field }) => {
                                return (
                                    <FormItem>
                                        <FormLabel>Descrição</FormLabel>
                                        <FormControl>
                                            <Textarea 
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )
                            }}
                        />

                        <Button type="submit" className="w-full">
                            Criar sala
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}