import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import axios from "axios";
import { TEnvSchema } from "env";
import { IExplainQuestionDTO } from "../dtos/QuestionDTO";

@Injectable()
export class OpenAiService {
  constructor(private configService: ConfigService<TEnvSchema, true>) {}
  async explainQuestion(modelRequest: IExplainQuestionDTO) {
    const { correctOptionContent, question, selectedOptionContent } =
      modelRequest;

    const openaiApiKey = this.configService.get("OPENAI_API_KEY");

    const data = {
      model: "gpt-4o-mini",
      messages: [
        {
          role: "assistant",
          content:
            "Você é um assistente da minha plataforma LMS e ajudará a corrigir questões respondidas pelos usuários.",
        },
        {
          role: "user",
          content: `Explique para fácil entendimento em até 4 linhas porque a resposta ${correctOptionContent} para a questão ${question} é a correta e a resposta ${selectedOptionContent} é a incorreta.`,
        },
      ],
    };

    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        data,
        {
          headers: {
            Authorization: `Bearer ${openaiApiKey}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log("Error at trying to call OpenAI API", error.message);
    }
  }
}
