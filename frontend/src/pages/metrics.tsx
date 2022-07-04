
import { Toast } from "../components/Toast";
import { useToast } from "../contexts/ToastContext";

export default function Metrics(){
    const {list, showToast} = useToast();
    return(
        <>
              <h1 onClick={() => showToast('success')}>Metricsqwdqwd</h1>
              <Toast list={list} position="top-right"/>
        </>
    )
}

// export const getServerSideProps = withSSRAuth(async(ctx) => {
//     return {
//         props: {}
//     }
// }, {
//     permissions: ['metrics.list'],
//     roles: ['administrator']
// });