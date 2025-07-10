import { useRoomQuestions } from "@/http/use-room-questions";
import { QuestionItem } from "../question-item";

interface QuestionListProps {
    roomId: string,
}

export function QuestionList(props: QuestionListProps) {

    const { data } = useRoomQuestions(props.roomId);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="font-semibold text-2xl text-foreground">
                    Perguntas & Respostas
                </h2>
            </div>

            <QuestionItem
                question={{
                    id: "1",
                    question: "Pergunta 1",
                    createdAt: new Date().toISOString(),
                }}
            />

            {data?.map(question => {
                return (
                    <QuestionItem 
                        key={question.id}
                        question={question}
                    />
                )
            })}
        </div>
    );
}
