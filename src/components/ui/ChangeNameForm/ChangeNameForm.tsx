import { useFormik } from 'formik';
import { useState } from 'react';
import * as yup from 'yup';
import Checkmark from '@components/icons/Checkmark';
import Button from '@components/ui/Button';
import Input from '@components/ui/Input';
import { DISPLAY_NAME_MAX_LENGTH } from '@constants/displayName';
import {
    Root,
    Layout,
    Name,
    ButtonGroup,
    ButtonGroupButton,
} from './ChangeNameForm.styles';

const validationSchema = yup.object().shape({
    name: yup
        .string()
        .max(
            DISPLAY_NAME_MAX_LENGTH,
            `Max ${DISPLAY_NAME_MAX_LENGTH} characters`,
        )
        .required('Required'),
});

interface ChangeNameFormProps {
    onSubmit: (value: string) => void;
    value: string;
}

const ChangeNameForm: React.FC<ChangeNameFormProps> = ({ onSubmit, value }) => {
    const [isEditing, setIsEditing] = useState<boolean>(false);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: value,
        },
        validationSchema,
        onSubmit: ({ name }) => {
            onSubmit(name);
            setIsEditing(false);
        },
    });

    const handleStartEditing = () => {
        setIsEditing(true);
    };

    const handleCancelEditing = () => {
        setIsEditing(false);
        formik.resetForm();
    };

    const handleKeyDown: React.KeyboardEventHandler = (event) => {
        if (event.key === 'Escape') {
            handleCancelEditing();
        }
    };

    return (
        <Root>
            {isEditing ? (
                <Layout
                    as="form"
                    onKeyDown={handleKeyDown}
                    onSubmit={formik.handleSubmit}
                >
                    <Input
                        autoFocus
                        fullWidth
                        id="name"
                        maxLength={DISPLAY_NAME_MAX_LENGTH}
                        name="name"
                        onChange={formik.handleChange}
                        value={formik.values.name}
                    />
                    <ButtonGroup>
                        <ButtonGroupButton
                            onClick={handleCancelEditing}
                            variant="plain"
                        >
                            Cancel
                        </ButtonGroupButton>
                        <ButtonGroupButton type="submit">
                            <Checkmark />
                        </ButtonGroupButton>
                    </ButtonGroup>
                </Layout>
            ) : (
                <Layout>
                    <Name>{value}</Name>
                    <Button onClick={handleStartEditing} variant="plain">
                        Change Name
                    </Button>
                </Layout>
            )}
        </Root>
    );
};

export default ChangeNameForm;
