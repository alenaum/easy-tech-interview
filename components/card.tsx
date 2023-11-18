import Link from 'next/link';

type Props = {
    redirectToPath: string
  }

  const Card = ({ redirectToPath }: Props) => {
    return (
        <div className="card w-96 bg-neutral shadow-xl">
            <div className="card-body">
                <h2 className="card-title">Explore the Docs</h2>
                <p>Learn the technical interview questions and answers</p>
                <div className="card-actions justify-end">
                <Link
                    className="btn btn-primary"
                    href={redirectToPath}>
                        Explore
                </Link>
                </div>
            </div>
        </div>
    );
  }

  export default Card