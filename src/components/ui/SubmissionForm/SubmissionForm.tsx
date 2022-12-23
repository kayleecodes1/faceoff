import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@components/ui/Button';
import PlayerAvatar from '@components/ui/PlayerAvatar';
import { AvatarImage } from '@store/common/common.types';
import { Root, Grid, Item, AvatarWrapper, AvatarInput } from './SubmissionForm.styles';
import React from 'react';

const INPUT_AVATAR_SIZE = 64;

const validationSchema = yup.object().shape({
    answers: yup
        .array()
        .of(yup.string().oneOf(Object.values(AvatarImage)))
        .length(2),
});

interface SubmissionFormProps {
    onSubmit: (values: { answers: [AvatarImage, AvatarImage] }) => Promise<void>;
}

const SubmissionForm: React.FC<SubmissionFormProps> = ({ onSubmit }) => {
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            answers: [] as AvatarImage[],
        },
        validateOnChange: true,
        validateOnMount: true,
        validationSchema,
        onSubmit: async ({ answers }) => {
            await onSubmit({ answers: answers as [AvatarImage, AvatarImage] });
        },
    });

    return (
        <Root style={{ display: 'flex', flexFlow: 'column nowrap', gap: 32 }} onSubmit={formik.handleSubmit}>
            <div
                style={{
                    display: 'flex',
                    flexFlow: 'row nowrap',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 32,
                }}
            >
                <PlayerAvatar
                    background={formik.values.answers[0] ? 'highlight' : 'default'}
                    image={formik.values.answers[0]}
                    size={150}
                />
                <PlayerAvatar
                    background={formik.values.answers[1] ? 'highlight' : 'default'}
                    image={formik.values.answers[1]}
                    size={150}
                />
            </div>
            <div>
                <Button disabled={!formik.isValid} fullWidth isLoading={formik.isSubmitting} type="submit">
                    Submit
                </Button>
            </div>
            <Grid size={INPUT_AVATAR_SIZE}>
                {Object.values(AvatarImage).map((avatarImage) => {
                    if (avatarImage === AvatarImage.None) {
                        return;
                    }
                    const isSelected = formik.values.answers.includes(avatarImage);
                    const isDisabled = formik.values.answers.length === 2 && !isSelected;
                    return (
                        <Item key={avatarImage}>
                            <AvatarWrapper isDisabled={isDisabled}>
                                <PlayerAvatar
                                    background={isSelected ? 'highlight' : 'default'}
                                    image={avatarImage as any}
                                    size={INPUT_AVATAR_SIZE}
                                />
                                <AvatarInput
                                    disabled={isDisabled || formik.isSubmitting}
                                    isSelected={isSelected}
                                    name="answers"
                                    onChange={formik.handleChange}
                                    type="checkbox"
                                    value={avatarImage}
                                />
                            </AvatarWrapper>
                        </Item>
                    );
                })}
            </Grid>
        </Root>
    );
};

export default SubmissionForm;
