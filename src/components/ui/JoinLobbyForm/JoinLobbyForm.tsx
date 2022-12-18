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
    joinCode: yup
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
    onSubmit: (values: { joinCode: string; name: string }) => Promise<void>;
}

const JoinLobbyForm: React.FC<JoinLobbyFormProps> = ({ onSubmit }) => {
    const formik = useFormik({
        initialValues: {
            joinCode: '',
            name: '',
        },
        validationSchema,
        onSubmit,
    });

    return (
        <Root as="form" onSubmit={formik.handleSubmit}>
            <div>
                <Label htmlFor="joinCode">Join Code</Label>
                <Input
                    autoComplete="off"
                    fullWidth
                    id="joinCode"
                    maxLength={6}
                    name="joinCode"
                    onChange={formik.handleChange}
                    value={formik.values.joinCode}
                />
            </div>
            <div>
                <Label htmlFor="name">Name</Label>
                <Input
                    autoComplete="off"
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
