import { useFormik } from 'formik';
import Button from '@components/ui/Button';
import { Root } from './CreateLobbyForm.styles';

interface CreateLobbyFormProps {
    onSubmit: () => Promise<void>;
}

const CreateLobbyForm: React.FC<CreateLobbyFormProps> = ({ onSubmit }) => {
    const formik = useFormik({
        initialValues: {},
        onSubmit,
    });

    return (
        <Root as="form" onSubmit={formik.handleSubmit}>
            <Button fullWidth isLoading={formik.isSubmitting} type="submit">
                Create
            </Button>
        </Root>
    );
};

export default CreateLobbyForm;
