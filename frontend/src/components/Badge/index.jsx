import styles from './styles.module.scss';

const typesBadge = {
    employee: {
        able: {
            title: 'Able',
            style: 'able',
           
        },
        unqualified: {
            title: 'Unqualified',
            style: 'unqualified',
           
        }
    },
    records: {
        able: {
            title: 'Able',
            style: 'able',
           
        },
        unqualified: {
            title: 'Unqualified',
            style: 'unqualified',
           
        },
        pending: {
            title: 'Pending',
            style: 'pending',
            
        }
    }
}

const Badge = ({type, status}) => {
 
  const currentBadge = typesBadge[type][status]

  return (
    <div className={`${styles.badgeContainer} ${styles[currentBadge.style]}`}>
        <span>
            {currentBadge.title}
        </span>
    </div>
  )
}

export default Badge