import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faSkullCrossbones,
    faTrophy,
    faPlay,
    faCircleCheck,
    faCircleXmark,
    faCircleStop,
    faThumbTack,
} from '@fortawesome/free-solid-svg-icons';
import { Status } from 'configuration/interfaces';

export const ChapterStatus = ({ dead, end, fixed, ready, start, win }: Status) => {
    return (
        <>
            {start && (
                <FontAwesomeIcon
                    icon={faPlay}
                    size='sm'
                    style={{ marginRight: '10px' }}
                />
            )}
            {fixed && (
                <FontAwesomeIcon
                    icon={faThumbTack}
                    size='sm'
                    style={{ marginRight: '10px' }}
                />
            )}
            {dead && (
                <FontAwesomeIcon
                    icon={faSkullCrossbones}
                    size='sm'
                    style={{ marginRight: '10px' }}
                />
            )}
            {end && (
                <FontAwesomeIcon
                    icon={faCircleStop}
                    size='sm'
                    style={{ marginRight: '10px' }}
                />
            )}
            {win && (
                <FontAwesomeIcon
                    icon={faTrophy}
                    size='sm'
                    style={{ marginRight: '10px' }}
                    color='gold'
                />
            )}
            {ready ? (
                <FontAwesomeIcon
                    icon={faCircleCheck}
                    size='sm'
                    style={{ marginRight: '10px' }}
                    color='green'
                />
            ) : (
                <FontAwesomeIcon
                    icon={faCircleXmark}
                    size='sm'
                    style={{ marginRight: '10px' }}
                    color='red'
                />
            )}
        </>
    );
};
