
import { IntroPart } from "./IntroPart";
import { SampleScarpedProducts } from "./SampleScarpedProducts";
import { wrapper } from "../wrapper/Wrapper";
import { HomeProjectOverview } from "./HomeProjectOverview";
import Contact from "../contact/Contact";

const HomeComponent = () => {
	return (
		<main>
			<IntroPart />
			<HomeProjectOverview />
			<SampleScarpedProducts />

			<Contact />
		</main>
	)
}

export const Home = wrapper(HomeComponent, "container-fluid mt-2");