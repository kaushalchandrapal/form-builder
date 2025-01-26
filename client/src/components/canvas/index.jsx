import React, { useState } from 'react';
import { Box, Button, Chip, Stack, TextField } from '@mui/material';
import { Icon } from '@iconify/react';
import { useDrag, useDrop } from 'react-dnd';
import { useSelector, useDispatch } from 'react-redux';

import {
  addElement,
  updateElement,
  moveElement,
  setSelectedElement,
  setFormName,
} from '../../store/slices/form-builder';
import PreviewModal from '../preview-modal';
import PropertiesPanel from '../properties-panel';

const componentsList = [
  { name: 'textInput', label: 'Text Input', type: 'formComponent', minMax: true, icon: "lucide:text-cursor-input" },
  { name: 'checkbox', label: 'Checkbox', type: 'formComponent', minMax: false, icon: "mingcute:checkbox-fill" },
  { name: 'radioButton', label: 'Radio Button', type: 'formComponent', minMax: false, icon: "radix-icons:radiobutton" },
  { name: 'datePicker', label: 'Date Picker', type: 'formComponent', minMax: false, icon: "clarity:date-solid" },
  { name: 'fileUpload', label: 'File Upload', type: 'formComponent', minMax: false, icon: "hugeicons:file-upload" },
  { name: 'selectDropDown', label: 'Select Dropdown', type: 'formComponent', minMax: false, icon: "fluent-mdl2:dropdown" },
];

const FormBuilder = () => {
  const dispatch = useDispatch();
  const { formElements, selectedElement, formName, formId } = useSelector((state) => state.formBuilder);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  console.log(formId);
  

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'formComponent',
    drop: (item) => {
      const newElement = { ...item, id: Date.now(), position: formElements.length };
      dispatch(addElement(newElement));
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <Stack>
      <Box
        style={{
          padding: '1rem',
          background: '#ffffff',
          boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        }}
      >
        <TextField
          label="Form Name"
          value={formName}
          onChange={(e) => dispatch(setFormName(e.target.value))}
          fullWidth
        />
      </Box>
      <div style={{ display: 'flex', height: '70vh' }}>
        <div
          style={{
            width: '20%',
            padding: '1rem',
            background: '#000',
          }}
        >
          {componentsList.map((comp) => (
            <DraggableComponent key={comp.id} component={comp} />
          ))}
        </div>

        <div
          ref={drop}
          style={{
            width: '90%',
            padding: '1rem',
            background: isOver ? '#d0f0d0' : '#e0e0e0',
          }}
        >
          {formElements.map((element, index) => (
            <DraggableCanvasElement
              key={element.id}
              element={element}
              moveElement={(id, newPosition) => dispatch(moveElement({ id, newPosition }))}
              position={index}
              setSelectedElement={(element) => dispatch(setSelectedElement(element))}
            />
          ))}
        </div>

        <PropertiesPanel
          selectedElement={selectedElement}
          updateElement={(updatedElement) => dispatch(updateElement(updatedElement))}
        />
      </div>

      <Box display="flex" justifyContent="end" margin={3}>
        <Button variant="contained" onClick={() => setIsPreviewOpen(true)}>
          Preview Form
        </Button>
      </Box>

      <PreviewModal
        open={isPreviewOpen}
        formElements={formElements}
        onClose={() => setIsPreviewOpen(false)}
        formName={formName}
        formId={formId}
      />
    </Stack>
  );
};

export default FormBuilder;

const DraggableComponent = ({ component }) => {
  const [, drag] = useDrag(() => ({
    type: 'formComponent',
    item: component,
  }));

  return (
    <div
      ref={drag}
      style={{
        padding: '8px',
        marginBottom: '8px',
        cursor: 'grab',
      }}
    >
      <Chip
        label={component.label}
        icon={<Icon icon={component.icon} width="32" height="32" />}
        style={{
          backgroundColor: '#f5f5f5',
          fontWeight: 'bold',
          cursor: 'move',
        }}
        onClick={(e) => {
          e.stopPropagation();
          setSelectedElement(component);
        }}
      />
    </div>
  );
};

const DraggableCanvasElement = ({ element, moveElement, position, setSelectedElement }) => {
  const [, drag] = useDrag(() => ({
    type: 'canvasElement',
    item: { id: element.id, position },
  }));

  const [, drop] = useDrop(() => ({
    accept: 'canvasElement',
    hover: (item) => {
      if (item.id !== element.id) {
        moveElement(item.id, position);
        item.position = position;
      }
    },
  }));

  return (
    <div
      ref={(node) => drag(drop(node))}
      style={{
        padding: '8px',
        marginBottom: '8px',
        cursor: 'move',
      }}
      onClick={() => setSelectedElement(element)}
    >
      <Chip
        label={element.label}
        icon={<Icon icon={element.icon} width="32" height="32" />}
        style={{
          backgroundColor: '#f5f5f5',
          fontWeight: 'bold',
          cursor: 'move',
        }}
        onClick={(e) => {
          e.stopPropagation();
          setSelectedElement(element);
        }}
      />
    </div>
  );
};
