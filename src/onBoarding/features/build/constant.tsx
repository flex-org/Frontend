import {
    Award,
    Book,
    CalendarDays,
    CircleQuestionMark,
    ClipboardCheck,
    Megaphone,
    MonitorPlay,
    RadioTower,
    ScrollText,
    Smartphone,
    Star,
    Users,
} from 'lucide-react';

export const iconsMap = (iconName: string, className: string) => {
    switch (iconName) {
        case 'fa-book':
            return <Book className={className} />;
        case 'fa-layer-group':
            return <Users className={className} />;
        case 'fa-video':
            return <MonitorPlay className={className} />;
        case 'fa-file-alt':
            return <ScrollText className={className} />;
        case 'fa-question-circle':
            return <CircleQuestionMark className={className} />;
        case 'fa-clipboard-check':
            return <ClipboardCheck className={className} />;
        case 'fa-bullhorn':
            return <Megaphone className={className} />;
        case 'fa-broadcast-tower':
            return <RadioTower className={className} />;
        case 'fa-certificate':
            return <Award className={className} />;
        case 'fa-calendar-alt':
            return <CalendarDays className={className} />;
        case 'fa-mobile-alt':
            return <Smartphone className={className} />;
        default:
            return <Star className={className} />;
    }
};
