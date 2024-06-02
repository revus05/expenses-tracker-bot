import { $Enums } from '@prisma/client'

type GetAICategoryPrediction = (text: string) => Promise<$Enums.ExpenseCategory | ''>

const getAICategoryPrediction: GetAICategoryPrediction = async text => {
  let category: $Enums.ExpenseCategory | ''
  try {
    const response = await fetch('http://localhost:5000/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    })

    const data = await response.json()
    category = data.category
  } catch (err) {
    category = ''
  }

  return category
}

export default getAICategoryPrediction
