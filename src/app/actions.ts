"use server";

import { personalizeSuccessStories } from "@/ai/flows/personalized-success-stories";
import { z } from "zod";
import { type PersonalizedStoriesState } from "./lib/definitions";

const allSuccessStories = [
    "Perdi 15kg em 3 meses sem passar fome! Os rituais mudaram minha relação com a comida e comigo mesma. - Joana, 35 anos, advogada, focada em bem-estar e perda de peso.",
    "Eu não tinha energia para nada. Hoje, corro 5km todos os dias e me sinto 10 anos mais jovem. Recomendo para todos os homens acima de 40. - Carlos, 48 anos, engenheiro, queria mais energia.",
    "Como estudante, minha rotina era uma bagunça. O programa me ajudou a organizar minha alimentação e a controlar a ansiedade. Me sinto mais focada e feliz. - Beatriz, 22 anos, universitária, buscava saúde e bem-estar.",
    "Depois da gravidez, achei que nunca mais voltaria ao meu peso. Os 7 Rituais foram um guia gentil e eficaz. Recuperei minha autoestima. - Mariana, 29 anos, mãe, focada em perda de peso pós-parto.",
    "Sempre lutei contra o efeito sanfona. Pela primeira vez, sinto que a mudança é definitiva. Aprendi a ouvir meu corpo. - Ricardo, 55 anos, aposentado, queria uma solução de saúde a longo prazo.",
    "Com a rotina de trabalho, eu não cuidava da minha saúde. O programa me ensinou a priorizar meu bem-estar com pequenas mudanças que fizeram uma grande diferença. Tenho mais disposição e saúde. - Lucas, 31 anos, designer, focado em melhorar a saúde.",
    "Aos 52 anos, achava que era tarde para mudar. Estava enganada! Os rituais me trouxeram um novo olhar sobre a vida e meu corpo. Sinto-me mais serena e com o bem-estar em dia. - Sônia, 52 anos, professora, focada em bem-estar geral.",
    "Vivendo no ritmo acelerado da faculdade e trabalho, minha energia estava sempre baixa. O programa me deu ferramentas práticas para revitalizar meu dia. É incrível! - Felipe, 24 anos, estagiário, queria aumentar a energia.",
    "Perder peso depois dos 40 parecia impossível. Com os rituais, perdi 10kg e ganhei uma nova perspectiva de vida. Minha saúde melhorou em todos os sentidos. - Marcos, 42 anos, comerciante, focado em perda de peso e saúde.",
    "Este produto é incrível! Recomendo a todos que desejam uma mudança de vida real e duradoura. Minha energia aumentou e perdi peso de forma saudável. - Ana, 28, nutricionista, interesse em bem-estar.",
    "Finalmente um programa que entende as necessidades de quem tem uma rotina corrida. Consegui incorporar os rituais no meu dia a dia e os resultados na minha saúde são visíveis. - Pedro, 38, empresário, interesse em saúde e energia.",
    "Eu estava cética, mas os 7 Rituais realmente funcionam. Melhorei minha relação com a comida e me sinto muito mais disposta. Recomendo de olhos fechados. - Julia, 45, dona de casa, interesse em perda de peso.",
    "Se você busca mais do que apenas emagrecer, mas sim um bem-estar completo, este é o caminho. O produto superou todas as minhas expectativas. - Fernando, 60, médico, interesse em saúde e bem-estar geral.",
    "Sou médico e recomendo o produto. É uma abordagem holística e eficaz para a perda de peso e mudança de hábitos. - Dr. André, 45, médico, interesse em saúde e bem-estar.",
    "Como nutricionista, indico o programa para meus pacientes. Ele complementa o plano alimentar e ajuda na reeducação de forma leve e sustentável. - Carla, 32, nutricionista, interesse em saúde e perda de peso.",
    "O produto é fantástico. Tenho 65 anos e nunca me senti tão bem. Minha energia está nas alturas e minha saúde melhorou consideravelmente. - Jorge, 65, aposentado, interesse em energia e saúde.",
    "Indico para todas as minhas amigas! É um divisor de águas na nossa busca por bem-estar. - Sofia, 29, influenciadora, interesse em bem-estar e saúde.",
    "O melhor investimento que fiz na minha saúde. Os rituais são simples, poderosos e realmente transformam a nossa rotina para melhor. - Rafael, 41, autônomo, interesse em saúde e bem-estar geral.",
    "Este produto salvou minha autoestima. Perdi os quilos que me incomodavam e ganhei uma nova perspectiva sobre meu corpo. Indico demais! - Laura, 27, publicitária, interesse em perda de peso e bem-estar."
];

const Schema = z.object({
  demographics: z.string(),
  interests: z.string(),
});

export async function getPersonalizedStories(
  _prevState: PersonalizedStoriesState,
  formData: FormData
): Promise<PersonalizedStoriesState> {
  const validatedFields = Schema.safeParse({
    demographics: formData.get("demographics"),
    interests: formData.get("interests"),
  });

  if (!validatedFields.success) {
    return {
      stories: [],
      message: "Campos inválidos. Por favor, preencha o formulário corretamente.",
    };
  }

  const { demographics, interests } = validatedFields.data;

  try {
    const result = await personalizeSuccessStories({
      demographics,
      interests,
      productName: "7 Rituais da Cura para Acabar com a Obesidade",
      allSuccessStories,
    });

    if (
      !result.relevantSuccessStories ||
      result.relevantSuccessStories.length === 0
    ) {
      return {
        stories: [],
        message:
          "Não encontramos depoimentos específicos para seu perfil. Veja algumas de nossas melhores histórias abaixo!",
        fallbackStories: allSuccessStories.slice(0, 3)
      };
    }

    return {
      stories: result.relevantSuccessStories,
      message: "",
    };
  } catch (error) {
    console.error("Error personalizing stories:", error);
    return {
      stories: [],
      message: "Ocorreu um erro ao buscar os depoimentos. Tente novamente.",
      fallbackStories: allSuccessStories.slice(0, 3)
    };
  }
}
