import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Button,
} from '@material-tailwind/react';
import Link from 'next/link';

interface Props {
    svg: Element;
    title: string;
    content: string;
    link: string;
    button: string;

}

export default function DashCards({ svg, title, content, link, button } : Props) {
    return (
        <Card className='mt-6 w-96'>
            <CardBody>
                {svg}
                <Typography variant='h5' color='blue-gray' className='mb-2'>
                    {title}
                </Typography>
                <Typography>
                    {content}
                </Typography>
            </CardBody>
            <CardFooter className='pt-0'>
                <Link href={link} className='inline-block'>
                    <Button size="sm" variant="text" className="flex items-center gap-2">
                        {button}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="h-4 w-4"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                            />
                        </svg>
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    )
}