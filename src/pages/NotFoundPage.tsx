import { Link } from 'react-router-dom';
import PageContainer from '../components/layout/PageContainer';
import EmptyState from '../components/common/EmptyState';

export default function NotFoundPage() {
  return (
    <PageContainer>
      <EmptyState title="This room does not exist" text="The page you followed is not part of the museum." action={<Link to="/" className="btn btn-accent">Back to the entrance</Link>} />
    </PageContainer>
  );
}
