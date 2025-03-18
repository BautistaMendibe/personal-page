export interface ProjectProps {
    title: string;
    description: string;
    link?: string;
    github?: string;
    image: string;
    tags: { name: string; class: string; icon: any }[];
    onClose: () => void;
}