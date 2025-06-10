import { MediasCarousel, Rating } from "deploily-ui-components";
import ApplicationDetailsCollapseContainer from "./containers/applicationDetailsCollapseContainer";
import ApplicationDescriptionContainer from "./containers/descriptionContainer";
import SelectDurationContainer from "./containers/selectDurationContainer";
import SelectProviderContainer from "./containers/selectProviderContainer";
import SelectVpsPlanContainer from "./containers/selectVpsPlanContainer";
import SelectVpsTypeContainer from "./containers/selectVpsTypeContainer";

export default function Page() {
    return (
        <>
            <ApplicationDescriptionContainer />
            <MediasCarousel medias={[
                {
                    id: 1,
                    image: "https://api.dicebear.com/7.x/miniavs/svg?seed=1",
                    title: "TTK Epay"
                },
                {
                    id: 2,
                    image: "https://api.dicebear.com/7.x/miniavs/svg?seed=2",
                    title: "TTK Epay"
                },
                {
                    id: 3,
                    image: "https://api.dicebear.com/7.x/miniavs/svg?seed=3",
                    title: "TTK Epay"
                }
            ]} />
            <Rating ratingValue={3.5} />
            <ApplicationDetailsCollapseContainer />
            <SelectProviderContainer />
            <SelectVpsTypeContainer />
            <SelectVpsPlanContainer />
            <SelectDurationContainer />
        </>
    );
}
