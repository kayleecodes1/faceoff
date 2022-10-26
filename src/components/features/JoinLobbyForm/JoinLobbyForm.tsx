import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@components/ui/Button';
import Input from '@components/ui/Input';
import Label from '@components/ui/Label';
import { DISPLAY_NAME_MAX_LENGTH } from '@constants/displayName';
import {
    JOIN_CODE_CHARACTERS,
    JOIN_CODE_LENGTH,
} from '@utilities/generateJoinCode';
import { Root } from './JoinLobbyForm.styles';

const validationSchema = yup.object().shape({
    roomCode: yup
        .string()
        .matches(
            new RegExp(`^[${JOIN_CODE_CHARACTERS}]{${JOIN_CODE_LENGTH}}$`, 'i'),
            'Invalid code',
        )
        .required('Required'),
    name: yup
        .string()
        .max(
            DISPLAY_NAME_MAX_LENGTH,
            `Max ${DISPLAY_NAME_MAX_LENGTH} characters`,
        )
        .required('Required'),
});

interface JoinLobbyFormProps {
    onSubmit: (values: { roomCode: string; name: string }) => Promise<void>;
}

const JoinLobbyForm: React.FC<JoinLobbyFormProps> = ({ onSubmit }) => {
    const formik = useFormik({
        initialValues: {
            roomCode: '',
            name: '',
        },
        validationSchema,
        onSubmit,
    });

    return (
        <Root as="form" onSubmit={formik.handleSubmit}>
            <div>
                <Label htmlFor="roomCode">Room Code</Label>
                <Input
                    fullWidth
                    id="roomCode"
                    maxLength={6}
                    name="roomCode"
                    onChange={formik.handleChange}
                    value={formik.values.roomCode}
                />
            </div>
            <div>
                <Label htmlFor="name">Name</Label>
                <Input
                    fullWidth
                    id="name"
                    maxLength={DISPLAY_NAME_MAX_LENGTH}
                    name="name"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                />
            </div>
            <div>
                <Button fullWidth isLoading={formik.isSubmitting} type="submit">
                    Join
                </Button>
            </div>
        </Root>
    );
};

export default JoinLobbyForm;
