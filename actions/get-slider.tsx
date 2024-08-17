import { Slider } from "@/types"
const URL = `${process.env.NEXT_PUBLIC_API_URL}/sliders`

const getSlider = async (id: string): Promise<Slider> => {
  const res = await fetch(`${URL}/${id}`)
  return res.json()
}

export default getSlider
