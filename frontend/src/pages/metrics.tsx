import { setupClientApi } from "../services/api";
import { withSSRAuth } from "../utils/withSSRAuth"

export default function Metrics(){
    return(
        <h1>Metricsqwdqwd</h1>
    )
}

export const getServerSideProps = withSSRAuth(async(ctx) => {

    return {
        props: {}
    }
}, {
    permissions: ['metrics.list'],
    roles: ['administrator']
});